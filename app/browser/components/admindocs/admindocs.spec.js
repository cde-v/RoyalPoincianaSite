import AdminDocsModule from './admindocs'
import AdminDocsController from './admindocs.controller';
import AdminDocsComponent from './admindocs.component';
import AdminDocsTemplate from './admindocs.html';

describe('AdminDocs', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AdminDocsModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AdminDocsController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(AdminDocsTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AdminDocsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AdminDocsTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AdminDocsController);
      });
  });
});
