class DocumentsController {
  constructor() {
    this.name = 'documents';
    this.downloadList = [
      { downloadPath: 'sample.pdf' },
      { downloadPath: 'example.pdf' },
      { downloadPath: 'document.pdf' },
      { downloadPath: 'stuff.pdf' },
      { downloadPath: 'community.pdf' },
      { downloadPath: 'rules.pdf' }
    ]
  }
}

export default DocumentsController;
