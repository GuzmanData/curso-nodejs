import { Router, Request, Response } from 'express';
import MySql from '../mysql/mysql';

const router = Router();


router.get('/heroes', (req: Request, res: Response) => {

    const query = `
    SELECT *
    FROM heroes;
    `

    MySql.ejecutarQuery(query, (err: any, heroes: Object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.status(200).json({
                ok: true,
                heroes
            });
        }

    });


});
router.get('/heroes/:id', (req: Request, res: Response) => {

    const id = req.params.id;

    const escapeId = MySql.instance.connection.escape(id);


    const query = `
    SELECT *
    FROM heroes
    WHERE id = ${escapeId};
    `

    MySql.ejecutarQuery(query, (err: any, heroe: Object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.status(200).json({
                ok: true,
                heroe: heroe[0]
            });
        }

    });
});

export default router;