export class Paths {
    private static dashboardRoute = "/school-management/dashboard";
    private static loginRoute = "/sign-in";

    public static dashboard(): string {
        return this.dashboardRoute;
    }

    public static login(): string {
        return this.loginRoute;
    }

}
