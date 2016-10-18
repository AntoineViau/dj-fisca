import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {WebMidiService} from './shared/webmidi.service';
import { AppComponent } from './app.component';
import { MidiInputComponent } from './midi-input.component';
import { FiscaCaComponent } from './fisca-ca.component';
import { EurlComponent } from './eurl.component';
import { EurlService } from './shared/eurl.service';
import { FormatService } from './shared/format.service';

@NgModule({
  declarations: [
    AppComponent,
    MidiInputComponent,
    FiscaCaComponent,
    EurlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WebMidiService, EurlService, FormatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
