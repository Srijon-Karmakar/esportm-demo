// server/middlewares/auth.js
export default function auth(req, res, next) {
    
    console.log('Auth middleware triggered');
    next();
  }
  














// export const protectPlayer = async (req, res, next) => {
//   try {
//     const auth = req.headers.authorization || '';
//     const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const player = await Player.findById(decoded.id);
    
//     if (!player) {
//       return res.status(404).json({ message: 'Player not found' });
//     }

//     req.user = player; // Setting as req.user to match controller expectations
//     next();
//   } catch (error) {
//     console.error('Auth error:', error);
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // For route protection that doesn't need user object
// export const auth = (req, res, next) => {
//   console.log('Auth middleware triggered');
//   next();
// };