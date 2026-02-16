import Offer from "../models/Offer.model.js";
import Player from "../models/Player.model.js";
import Notification from "../models/Notification.model.js";

// ✅ Helper: push notification
const notify = async ({ userType, user, title, body, data }) => {
  try {
    await Notification.create({ userType, user, title, body, data });
  } catch (e) {
    console.error("Notification error:", e.message);
  }
};

// ✅ Manager / Coach → Create Offer
export const createOffer = async (req, res) => {
  try {
    const { playerId, price, currency = "INR", message } = req.body;
    if (!playerId || !price)
      return res.status(400).json({ message: "playerId and price are required" });

    const player = await Player.findById(playerId);
    if (!player || !player.isAvailableOnMarket)
      return res.status(404).json({ message: "Player not available on market" });

    const fromRole = req.fromRole;
    const fromUser = req.user._id;
    const club =
      fromRole === "manager" ? req.user.club : req.user.club_id || null;

    const offer = await Offer.create({
      player: player._id,
      fromRole,
      fromUser,
      club,
      price,
      currency,
      message,
    });

    await notify({
      userType: "player",
      user: player._id,
      title: "New Offer Received",
      body: `You received an offer of ${currency} ${price} from a ${fromRole}.`,
      data: { offerId: offer._id, playerId: player._id },
    });

    res.status(201).json({ message: "Offer sent successfully", offer });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ✅ Manager/Coach → View Sent Offers
export const listSentOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ fromUser: req.user._id })
      .populate("player", "name position market isAvailableOnMarket")
      .sort({ createdAt: -1 });
    res.json(offers);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ✅ Player → View Received Offers
export const listReceivedOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ player: req.user._id })
      .populate("fromUser", "name email")
      .populate("club", "name")
      .sort({ createdAt: -1 });
    res.json(offers);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ✅ Player → Accept/Reject Offer
export const actOnOffer = async (req, res) => {
  try {
    const { action } = req.body; // 'accept' | 'reject'
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    if (String(offer.player) !== String(req.user._id))
      return res.status(403).json({ message: "Not your offer" });

    if (offer.status !== "pending")
      return res.status(400).json({ message: `Already ${offer.status}` });

    if (action === "reject") {
      offer.status = "rejected";
      await offer.save();

      await notify({
        userType: offer.fromRole,
        user: offer.fromUser,
        title: "Offer Rejected",
        body: "Your offer was rejected by the player.",
        data: { offerId: offer._id },
      });

      return res.json({ message: "Offer rejected" });
    }

    if (action === "accept") {
      offer.status = "accepted";
      await offer.save();

      const player = await Player.findById(offer.player);
      player.isAvailableOnMarket = false;
      if (offer.club) player.club_id = offer.club;
      await player.save();

      await notify({
        userType: offer.fromRole,
        user: offer.fromUser,
        title: "Offer Accepted",
        body: "Your offer was accepted by the player.",
        data: { offerId: offer._id },
      });

      return res.json({ message: "Offer accepted" });
    }

    res.status(400).json({ message: "Invalid action" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
