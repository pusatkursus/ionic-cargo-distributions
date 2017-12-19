"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var http_2 = require("@angular/http");
var auth_service_1 = require("../auth.service");
var material_1 = require("@angular/material");
var LoginComponent = (function () {
    function LoginComponent(router, http, auth, snackBar) {
        this.router = router;
        this.http = http;
        this.auth = auth;
        this.snackBar = snackBar;
        this.user = {
            username: 'transity.ts@gmail.com',
            password: '123'
        };
        this.showSpinner = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function (usercreds) {
        var _this = this;
        this.showSpinner = true;
        var urlSearchParams = new http_2.URLSearchParams();
        urlSearchParams.append('username', usercreds.username);
        urlSearchParams.append('password', usercreds.password);
        urlSearchParams.append('grant_type', 'password');
        urlSearchParams.append('client_id', 'my-trusted-client');
        this.http.post('http://10.0.2.2:8080/cargo/oauth/token', urlSearchParams.toString()).subscribe(function (data) {
            _this.auth.setToken(data);
            _this.router.navigate(['/triplist']);
        }, function (err) {
            _this.showSpinner = false;
            _this.snackBar.open("E-mail/password invaid", 'ok', {
                duration: 5000
            });
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, http_1.HttpClient, auth_service_1.AuthService, material_1.MatSnackBar])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBQ3pDLDZDQUEyRTtBQUMzRSxzQ0FBK0M7QUFDL0MsZ0RBQThDO0FBRTlDLDhDQUF1RTtBQU92RSxJQUFhLGNBQWM7SUFRekIsd0JBQW9CLE1BQWMsRUFBVSxJQUFnQixFQUFVLElBQWlCLEVBQVMsUUFBcUI7UUFBakcsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQU5ySCxTQUFJLEdBQUc7WUFDTCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUM7UUFDRixnQkFBVyxHQUFZLEtBQUssQ0FBQztJQUU0RixDQUFDO0lBRTFILGlDQUFRLEdBQVI7SUFDQSxDQUFDO0lBV0QsOEJBQUssR0FBTCxVQUFNLFNBQVM7UUFBZixpQkF1QkM7UUF0QkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxzQkFBZSxFQUFFLENBQUM7UUFDNUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxlQUFlLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxFQUN2RCxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ3pDLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQ0QsVUFBQyxHQUFHO1lBQ0YsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxFQUFFO2dCQUNqRCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztRQUVMLENBQUMsQ0FDQSxDQUFBO0lBR0wsQ0FBQztJQUtILHFCQUFDO0FBQUQsQ0FBQyxBQWxERCxJQWtEQztBQWxEWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0tBQ3JDLENBQUM7cUNBUzRCLGVBQU0sRUFBZ0IsaUJBQVUsRUFBZ0IsMEJBQVcsRUFBbUIsc0JBQVc7R0FSMUcsY0FBYyxDQWtEMUI7QUFsRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgVVJMU2VhcmNoUGFyYW1zfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7RGVmYXVsdFVybFNlcmlhbGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge01hdFNuYWNrQmFyLE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbG9naW4nLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHVzZXIgPSB7XG4gICAgdXNlcm5hbWU6ICd0cmFuc2l0eS50c0BnbWFpbC5jb20nLFxuICAgIHBhc3N3b3JkOiAnMTIzJ1xuICB9O1xuICBzaG93U3Bpbm5lcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHVibGljIHNuYWNrQmFyOiBNYXRTbmFja0JhcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICAvLyBsb2dpbjIodXNlcmNyZWRzKSB7XG5cbiAgLy8gICBsZXQgdXNlcmxvZ2luID0gdGhpcy5hdXRoLmxvZ2luKHVzZXJjcmVkcyk7XG4gIC8vICAgICB1c2VybG9naW4udGhlbigocmVzKSA9PiB7XG4gIC8vICAgICAgIGlmIChyZXMpXG4gIC8vICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3RyaXBsaXN0J10pO1xuICAvLyAgICAgfSlcbiAgLy8gfVxuXG4gIGxvZ2luKHVzZXJjcmVkcykge1xuICAgIHRoaXMuc2hvd1NwaW5uZXIgPSB0cnVlO1xuICAgIGxldCB1cmxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgdXJsU2VhcmNoUGFyYW1zLmFwcGVuZCgndXNlcm5hbWUnLCB1c2VyY3JlZHMudXNlcm5hbWUpO1xuICAgIHVybFNlYXJjaFBhcmFtcy5hcHBlbmQoJ3Bhc3N3b3JkJywgdXNlcmNyZWRzLnBhc3N3b3JkKTtcbiAgICB1cmxTZWFyY2hQYXJhbXMuYXBwZW5kKCdncmFudF90eXBlJywncGFzc3dvcmQnKTtcbiAgICB1cmxTZWFyY2hQYXJhbXMuYXBwZW5kKCdjbGllbnRfaWQnLCdteS10cnVzdGVkLWNsaWVudCcpO1xuXG4gICAgdGhpcy5odHRwLnBvc3QoJ2h0dHA6Ly8xMC4wLjIuMjo4MDgwL2NhcmdvL29hdXRoL3Rva2VuJyxcbiAgICB1cmxTZWFyY2hQYXJhbXMudG9TdHJpbmcoKSkuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLmF1dGguc2V0VG9rZW4oZGF0YSk7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy90cmlwbGlzdCddKTtcbiAgICAgIH0sXG4gICAgICAoZXJyKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd1NwaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zbmFja0Jhci5vcGVuKFwiRS1tYWlsL3Bhc3N3b3JkIGludmFpZFwiLCAnb2snLCB7XG4gICAgICAgICAgZHVyYXRpb246IDUwMDBcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyBpcyBuZXcgZXJyb3JzICMjIyMjIyMgXCIrIGVycilcbiAgICAgIH1cbiAgICAgIClcblxuXG4gIH1cblxuICBcblxuXG59XG4iXX0=