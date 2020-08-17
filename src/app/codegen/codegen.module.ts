import { FormsModule } from '@angular/forms';
import { CodegenComponent } from './codegen.component';
import { ModuleWithProviders, NgModule,Optional,SkipSelf } from '@angular/core';
import { CodegenService } from './codegen.service';
import { CommonModule } from '@angular/common';
@NgModule({
    imports:      [ CommonModule,FormsModule],
    declarations: [  CodegenComponent],
    exports:      [ CodegenComponent ]
  })

export class CodegenModule {
  constructor(@Optional() @SkipSelf() parentModule?: CodegenModule) {
    if (parentModule) {
      throw new Error(
        'CodegenModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<CodegenModule> {
    return {
        ngModule: CodegenModule,
        providers: [CodegenService]
      };
  }
}
