import { controller, httpGet, requestParam } from "inversify-express-utils";
import express from "express";
import { CustomBaseController } from "./CustomBaseController";


@controller("/files")
export class FileController extends CustomBaseController {


    @httpGet("/:id")
    public async loadAnon(@requestParam("id") id: string, req: express.Request, res: express.Response): Promise<any> {
        return this.actionWrapperAnon(req, res, async () => {
            const file = await this.baseRepositories.file.loadById(id);;

            return this.baseRepositories.file.convertToModel(file.churchId, file);
        });
    }



}
