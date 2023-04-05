import Backbone from 'backbone';
import Adapt from 'core/js/adapt';
import data from 'core/js/data';
import location from 'core/js/location';
import router from 'core/js/router';

class HomeButton extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, "app:dataReady", this.onDataReady);
    this.listenTo(Adapt, "navigation:homeButton", this.onHomeButtonClick);
  }

  onDataReady() {
    const config = Adapt.config.get("_homeButton");
    if (!config || config._isEnabled === false) return;
    this.$html = $("html");
    this.listenTo(Adapt, {
      remove: this.disable,
      "router:menu router:page": this.onRouterEvent,
      "navigation:redirectedHomeButton": this.redirected,
    });
  }

  get currentModelConfig() {
    return location._currentModel?.get("_homeButton");
  }

  get courseConfig() {
    return Adapt.course?.get("_homeButton");
  }

  onRouterEvent() {
    const isEnabled = this.currentModelConfig?._isEnabled;
    if (!isEnabled) return this.disable();
    this.enable();
  }

  disable() {
    this.$html.removeClass("hide-nav-home-btn");
    $(".js-nav-home-btn").remove();
  }

  enable() {
    const currentModelConfig = this.currentModelConfig;
    const courseConfig = this.courseConfig;
    this.$html.toggleClass(
      "hide-nav-home-btn",
      Boolean(currentModelConfig?._hideHomeButton)
    );
    // extend functionality to toggle back button display
    this.$html.toggleClass(
      "hide-nav-back-btn",
      Boolean(currentModelConfig?._hideBackButton)
    );
    const altText = currentModelConfig?.alt || courseConfig?.alt || "";
    const $backButton = $('button[data-event="backButton"]');
    const $icon = $("<div>", { class: "icon", "aria-hidden": true });
    const customLink =
      this.currentModelConfig?._customLink ||
      this.courseConfig?._customLink ||
      "";
    const $homeButton = $("<button>", {
      "data-event": currentModelConfig?._redirectToId
        ? "redirectedHomeButton"
        : "homeButton",
      class: "btn-icon nav__btn nav__homebutton-btn js-nav-home-btn",
      "aria-label": altText,
      role: "link",
    }).append($icon);
    // insert immediately after back button (so that tab order is correct)
    $homeButton.insertAfter($backButton);
  }

  redirected() {
    const redirectToId =
      this.currentModelConfig?._redirectToId ||
      this.courseConfig?._redirectToId;
    if (!redirectToId) return;
    const model = data.findById(redirectToId);
    if (!model) return;
    switch (model.get("_type")) {
      case "course":
        router.navigateToHomeRoute();
        break;
      case "menu":
      // fallthrough
      case "page":
        router.navigateToElement(model.get("_id"));
        break;
      default:
        break;
    }
  }

  onHomeButtonClick() {
    const redirectToId =
      this.currentModelConfig?._redirectToId ||
      this.courseConfig?._redirectToId;
    const customLink =
      this.currentModelConfig?._customLink || this.courseConfig?._customLink;
    if (customLink) {
      window.location.assign(`https://${customLink}`);
    } else if (redirectToId) {
      const model = data.findById(redirectToId);
      if (model) {
        switch (model.get("_type")) {
          case "course":
            router.navigateToHomeRoute();
            break;
          case "menu":
          // fallthrough
          case "page":
            router.navigateToElement(model.get("_id"));
            break;
          default:
            break;
        }
      } else {
        router.navigateToHomeRoute();
      }
    } else {
      router.navigateToHomeRoute();
    }
  }
}
export default new HomeButton();
