import AdminNavbarModule from './adminnavbar'
import AdminNavbarController from './adminnavbar.controller';
import AdminNavbarComponent from './adminnavbar.component';
import AdminNavbarTemplate from './adminnavbar.html';

describe('AdminNavbar', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AdminNavbarModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AdminNavbarController();
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
      expect(AdminNavbarTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AdminNavbarComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AdminNavbarTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AdminNavbarController);
      });
  });
});
