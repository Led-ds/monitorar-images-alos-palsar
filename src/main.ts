import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { MonitoramentoComponent } from './app/monitoramento/monitoramento.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [MonitoramentoComponent, provideHttpClient()],
}).catch((err) => console.error(err));
