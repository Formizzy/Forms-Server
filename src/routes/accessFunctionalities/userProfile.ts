import express, { Request, Response } from 'express'
import authentication from '../../auth/authentication';

const router = express.Router();

router.use(
    authentication
)

router.get(
    "/",
    async (req: Request, res: Response) => {
        res.send({ user: res.locals.user })
    })

export const userProfile = router;