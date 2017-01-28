import AdminNoticesModule from './adminnotices'
import AdminNoticesController from './adminnotices.controller';
import AdminNoticesComponent from './adminnotices.component';
import AdminNoticesTemplate from './adminnotices.html';

describe('AdminNotices', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AdminNoticesModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AdminNoticesController();
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
      expect(AdminNoticesTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AdminNoticesComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AdminNoticesTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AdminNoticesController);
      });
  });
});
