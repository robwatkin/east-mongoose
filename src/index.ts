import path from "path";

class Adapter {
  params: {};

  constructor(params: {}) {
    this.params = params;
  }

  getTemplatePath() {
    return path.join(__dirname, 'migrationTemplates', 'promises.js');
  };


}
