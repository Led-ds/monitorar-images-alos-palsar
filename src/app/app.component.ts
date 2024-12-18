import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MonitoramentoComponent } from './monitoramento/monitoramento.component';
import { MapComponent } from "./map/map.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MonitoramentoComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'monitoramento-sar';
}
