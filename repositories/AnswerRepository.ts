import { injectable } from "inversify";
import { DB } from "../db";
import { Answer } from "../models";
import { UniqueIdHelper } from "../helpers";

@injectable()
export class AnswerRepository {

    public save(answer: Answer) {
        if (UniqueIdHelper.isMissing(answer.id)) return this.create(answer); else return this.update(answer);
    }

    public async create(answer: Answer) {
        answer.id = UniqueIdHelper.shortId();
        const sql = "INSERT INTO answers (id, churchId, formSubmissionId, questionId, value) VALUES (?, ?, ?, ?, ?);";
        const params = [answer.id, answer.churchId, answer.formSubmissionId, answer.questionId, answer.value];
        await DB.query(sql, params);
        return answer;
    }

    public async update(answer: Answer) {
        const sql = "UPDATE answers SET formSubmissionId=?, questionId=?, value=? WHERE id=? and churchId=?";
        const params = [answer.formSubmissionId, answer.questionId, answer.value, answer.id, answer.churchId]
        await DB.query(sql, params);
        return answer
    }

    public delete(churchId: string, id: string) {
        return DB.query("DELETE FROM answers WHERE id=? AND churchId=?;", [id, churchId]);
    }

    public deleteForSubmission(churchId: string, formSubmissionId: string) {
        return DB.query("DELETE FROM answers WHERE churchId=? AND formSubmissionId=?;", [churchId, formSubmissionId]);
    }

    public load(churchId: string, id: string) {
        return DB.queryOne("SELECT * FROM answers WHERE id=? AND churchId=?;", [id, churchId]);
    }

    public loadAll(churchId: string) {
        return DB.query("SELECT * FROM answers WHERE churchId=?;", [churchId]);
    }

    public loadForFormSubmission(churchId: string, formSubmissionId: string) {
        return DB.query("SELECT * FROM answers WHERE churchId=? AND formSubmissionId=?;", [churchId, formSubmissionId]);
    }

    public convertToModel(churchId: string, data: any) {
        const result: Answer = { id: data.id, formSubmissionId: data.formSubmissionId, questionId: data.questionId, value: data.value };
        return result;
    }

    public convertAllToModel(churchId: string, data: any[]) {
        const result: Answer[] = [];
        data.forEach(d => result.push(this.convertToModel(churchId, d)));
        return result;
    }

}
