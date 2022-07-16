import { Service } from "typedi";
import * as pdf from "html-pdf";
import Container from "typedi";
import * as path from "path";
import * as fs from "fs";

@Service()
export class PdfService {
    join(root: string) {
        return path.resolve(__dirname, "..", "res", root);
    }

    async toPDF(html: string, options: pdf.CreateOptions) {
        return new Promise((resolve, reject) => {
            pdf.create(html, options).toFile(
                this.join("test.pdf"),
                (err: any, res: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve("PDF 변환 작업이 완료되었습니다.");
                }
            );
        });
    }
}
