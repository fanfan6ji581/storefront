import { ToastOptions } from 'ng2-toastr';

export class CustomToastOption extends ToastOptions {
  newestOnTop = false;
  showCloseButton = true;
  positionClass = 'toast-bottom-left';
}
