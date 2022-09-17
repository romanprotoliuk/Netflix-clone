import jwt, { decode } from "jsonwebtoken"
import { findVideoIdByUser, updateStats, insertStats } from "../../lib/db/hasura";

export default async function stats(req, res) {
  if (req.method === 'POST') {
    console.log({ cookies: req.cookies });
    try {
      const token = req.cookies.token
      if (!token) {
        res.status(403).send({});
      } else {
        const videoId = req.query.videoId
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.issuer
        const doesStatsExists = await findVideoIdByUser(token, userId, videoId)
        if (doesStatsExists) {
          // update it
          const response = await updateStats(token, {
            watched: true, 
            userId,
            videoId,
            favorited: 0
          })
          res.send({ msg: 'it works', response });
        } else {
          const response = await insertStats(token, {
            watched: false, 
            userId,
            videoId,
            favorited: 0
          })
          res.send({ msg: 'it works', response });
        }
        
      }
    } catch (error) {
      console.error("Error occured / stats", error)
      res.status(500).send({ done: false, error: error?.message })
    }
  }
}
