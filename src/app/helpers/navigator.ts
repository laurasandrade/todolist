export class Navigator {

  static navigateToLogin(): void {
    location.hash = 'login';
  }

  static navigateToSearchPolls(): void {
    location.hash = 'polls';
  }

}
