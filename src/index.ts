import path from "path";

export class Adapter {
  params: Record<string, unknown>;

  constructor(params: Record<string, unknown>) {
    this.params = params;
  }

  getTemplatePath(): string {
    return path.join(__dirname, 'migrationTemplates', 'promises.js');
  }
}
