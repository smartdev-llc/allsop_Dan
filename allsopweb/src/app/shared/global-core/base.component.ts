import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NGXLogger } from "ngx-logger";
import { StoreProvider } from "app/store/provider/store";
import { GlobalAppData } from "app/shared/global-core/global-app-data";
import { UnSubableComponent } from "app/shared/global-core/unsubable.component";
import { AppEventService } from "app/shared/global-core/app-event.service";

@Component({
  template: ''
})
export class BaseComponent extends UnSubableComponent {
  protected Logger: NGXLogger;
  protected Router: Router;
  protected Store: StoreProvider;
  protected AppEvent: AppEventService;
  constructor() {
    super();
    this.Logger = GlobalAppData.AppInjector!.get(NGXLogger);
    this.Router = GlobalAppData.AppInjector!.get(Router);
    this.Store = GlobalAppData.AppInjector!.get(StoreProvider);
    this.AppEvent = GlobalAppData.AppInjector!.get(AppEventService);
  }
}