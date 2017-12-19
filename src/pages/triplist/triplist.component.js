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
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var auth_service_1 = require("../auth.service");
var TriplistComponent = (function () {
    function TriplistComponent(http, router, auth) {
        this.http = http;
        this.router = router;
        this.auth = auth;
        this.componentToDisplay = 1;
        this.tripName = "hello";
        this.tripList = null;
    }
    TriplistComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    TriplistComponent.prototype.setComponent = function (componentNumber) {
        this.componentToDisplay = componentNumber;
    };
    TriplistComponent.prototype.squeroot = function () {
        this.router.navigate(['/itabs']);
    };
    TriplistComponent.prototype.getData = function () {
        var _this = this;
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('vehicleTripId', '119');
        urlSearchParams.append('loggedInUserId', '13');
        this.http.get('http://10.0.2.2:8080/cargo/api/hub/retrieve_tripsheet?vehicleTripId=197&loggedInUserId=18').subscribe(function (data) {
            console.log(data);
            _this.tripList = data;
        });
        this.http.get('http://localhost:8080/cargo/api/retrieve_pickupRequestSkuItems?pickupRequestId=354&loggedInUserId=18').subscribe(function (data) {
            console.log(data);
        });
        this.http.get('http://localhost:8080/cargo/api/retrieve_vehicleTripDriverAssigned?driverId=217').subscribe(function (data) {
            console.log(data);
        });
        this.http.get('http://localhost:8080/cargo/api/hub/update_vehicleTrip?vehicleTripId=197&status=2&loggedInUserId=18').subscribe(function (data) {
            console.log(data);
            _this.http.get('http://localhost:8080/cargo/api/hub/update_vehicleTrip?vehicleTripId=197&status=3&loggedInUserId=18').subscribe(function (data) {
                console.log(data);
            });
        });
    };
    TriplistComponent.prototype.DisplayMap = function () {
        var location = new google.maps.LatLng(13.0005618, 80.2478447);
        var options = {
            center: location,
            zoom: 10,
            streetViewControl: false,
        };
        var map = new google.maps.Map(this.mapRef.nativeElement, options);
        this.addMarker(location, map);
    };
    TriplistComponent.prototype.addMarker = function (position, map) {
        return new google.maps.Marker({
            position: position,
            map: map
        });
    };
    return TriplistComponent;
}());
__decorate([
    core_1.ViewChild('map'),
    __metadata("design:type", core_1.ElementRef)
], TriplistComponent.prototype, "mapRef", void 0);
TriplistComponent = __decorate([
    core_1.Component({
        selector: 'app-triplist',
        templateUrl: './triplist.component.html',
        styleUrls: ['./triplist.component.css']
    }),
    __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, auth_service_1.AuthService])
], TriplistComponent);
exports.TriplistComponent = TriplistComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpcGxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJpcGxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBdUU7QUFFdkUsNkNBQWtEO0FBRWxELDBDQUF5QztBQUN6QyxnREFBOEM7QUFZOUMsSUFBYSxpQkFBaUI7SUFVNUIsMkJBQW9CLElBQWdCLEVBQVUsTUFBYyxFQUFVLElBQWlCO1FBQW5FLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBYTtRQVAvRSx1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFJdkMsYUFBUSxHQUFXLE9BQU8sQ0FBQztRQUMzQixhQUFRLEdBQUcsSUFBSSxDQUFDO0lBRTJFLENBQUM7SUFFNUYsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUVqQixDQUFDO0lBSUQsd0NBQVksR0FBWixVQUFhLGVBQXVCO1FBQ2xDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxlQUFlLENBQUM7SUFDNUMsQ0FBQztJQUdELG9DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVDLG1DQUFPLEdBQVA7UUFBQSxpQkF5Q0c7UUF2Q0QsSUFBSSxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUM1QyxlQUFlLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxlQUFlLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDJGQUEyRixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUN2SCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUMsQ0FDQSxDQUFBO1FBSUgsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsc0dBQXNHLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ25JLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkIsQ0FBQyxDQUVELENBQUE7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDOUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuQixDQUFDLENBRUQsQ0FBQTtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHFHQUFxRyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUNsSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXBCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHFHQUFxRyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtnQkFDbEksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVuQixDQUFDLENBRUQsQ0FBQTtRQUVBLENBQUMsQ0FFRCxDQUFBO0lBR0QsQ0FBQztJQUVILHNDQUFVLEdBQVY7UUFFTyxJQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUUvRCxJQUFNLE9BQU8sR0FBRztZQUNiLE1BQU0sRUFBQyxRQUFRO1lBQ2YsSUFBSSxFQUFDLEVBQUU7WUFDUCxpQkFBaUIsRUFBQyxLQUFLO1NBQ3hCLENBQUM7UUFDQSxJQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxxQ0FBUyxHQUFULFVBQVUsUUFBUSxFQUFDLEdBQUc7UUFDbEIsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUIsUUFBUSxVQUFBO1lBQ1IsR0FBRyxLQUFBO1NBQ0osQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNULHdCQUFDO0FBQUQsQ0FBQyxBQTFGRCxJQTBGQztBQXJGbUI7SUFBakIsZ0JBQVMsQ0FBQyxLQUFLLENBQUM7OEJBQVEsaUJBQVU7aURBQUM7QUFMekIsaUJBQWlCO0lBTjdCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO0tBQ3hDLENBQUM7cUNBWTBCLGlCQUFVLEVBQWtCLGVBQU0sRUFBZ0IsMEJBQVc7R0FWNUUsaUJBQWlCLENBMEY3QjtBQTFGWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsVmlld0NoaWxkLEVsZW1lbnRSZWYsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSXRhYnNDb21wb25lbnQgfSBmcm9tICcuLi9pb25pYy9pdGFicy9pdGFicy5jb21wb25lbnQnO1xuXG5cbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXRyaXBsaXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RyaXBsaXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHJpcGxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgVHJpcGxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cbiAgcHJpdmF0ZSBjb21wb25lbnRUb0Rpc3BsYXk6IG51bWJlciA9IDE7ICAvLyB0aGlzIGlzIHVzZWQgZm9yIGRpc3BsYXkgZ29vZ2xlIG1hcCBhbmQgdHJpcGxpc3QgZmxhZ1xuXG4gIEBWaWV3Q2hpbGQoJ21hcCcpIG1hcFJlZjpFbGVtZW50UmVmO1xuXG4gIHRyaXBOYW1lOiBzdHJpbmcgPSBcImhlbGxvXCI7XG4gIHRyaXBMaXN0ID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZ2V0RGF0YSgpO1xuICAgLy8gdGhpcy5EaXNwbGF5TWFwKCk7ICBcbiAgfVxuXG4gIC8vIHRoaXMgaXMgdXNlZCBmb3IgZGlzcGxheSB0cmlwbGlzdCBhbmQgZ29vZ2xlIG1hcCBkZXBlbmR1cG9uIHRoZSBmbGFnICBudW1iZXIgPSAxO1xuXG4gIHNldENvbXBvbmVudChjb21wb25lbnROdW1iZXI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY29tcG9uZW50VG9EaXNwbGF5ID0gY29tcG9uZW50TnVtYmVyO1xuICB9XG5cbiAgLy8gdGhpcyBmdW5jdGlvbiB1c2VkIGZvciBuYXZpZ2F0ZSBhbm90aGVyIHBhZ2UgbGlrZSBzcXVlIHBhZ2VcbiAgc3F1ZXJvb3QoKXtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9pdGFicyddKTtcbn1cblxuICBnZXREYXRhKCkge1xuICAgIFxuICAgIGxldCB1cmxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgdXJsU2VhcmNoUGFyYW1zLmFwcGVuZCgndmVoaWNsZVRyaXBJZCcsICcxMTknKTtcbiAgICB1cmxTZWFyY2hQYXJhbXMuYXBwZW5kKCdsb2dnZWRJblVzZXJJZCcsICcxMycpO1xuXG4gICAgdGhpcy5odHRwLmdldCgnaHR0cDovLzEwLjAuMi4yOjgwODAvY2FyZ28vYXBpL2h1Yi9yZXRyaWV2ZV90cmlwc2hlZXQ/dmVoaWNsZVRyaXBJZD0xOTcmbG9nZ2VkSW5Vc2VySWQ9MTgnKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICB0aGlzLnRyaXBMaXN0ID0gZGF0YTtcbiAgICAgIH0gXG4gICAgICApXG5cbiAgICAgIC8vaHR0cDovL2xvY2FsaG9zdDo4MDgwL2NhcmdvL2FwaS9yZXRyaWV2ZV92ZWhpY2xlVHJpcERyaXZlckFzc2lnbmVkXG5cbiAgICB0aGlzLmh0dHAuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjgwODAvY2FyZ28vYXBpL3JldHJpZXZlX3BpY2t1cFJlcXVlc3RTa3VJdGVtcz9waWNrdXBSZXF1ZXN0SWQ9MzU0JmxvZ2dlZEluVXNlcklkPTE4Jykuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgLy8gdGhpcy50cmlwTGlzdCA9IGRhdGE7XG4gICAgIH1cbiAgICAgXG4gICAgKVxuICAgIHRoaXMuaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9jYXJnby9hcGkvcmV0cmlldmVfdmVoaWNsZVRyaXBEcml2ZXJBc3NpZ25lZD9kcml2ZXJJZD0yMTcnKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAvLyB0aGlzLnRyaXBMaXN0ID0gZGF0YTtcbiAgICAgfVxuICAgICBcbiAgICApXG4gICAgdGhpcy5odHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2NhcmdvL2FwaS9odWIvdXBkYXRlX3ZlaGljbGVUcmlwP3ZlaGljbGVUcmlwSWQ9MTk3JnN0YXR1cz0yJmxvZ2dlZEluVXNlcklkPTE4Jykuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgIHRoaXMuaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9jYXJnby9hcGkvaHViL3VwZGF0ZV92ZWhpY2xlVHJpcD92ZWhpY2xlVHJpcElkPTE5NyZzdGF0dXM9MyZsb2dnZWRJblVzZXJJZD0xOCcpLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgIC8vIHRoaXMudHJpcExpc3QgPSBkYXRhO1xuICAgICB9XG4gICAgIFxuICAgIClcbiAgICAgLy8gdGhpcy50cmlwTGlzdCA9IGRhdGE7XG4gICAgIH1cbiAgICAgXG4gICAgKVxuXG4gICAgLy9cbiAgICB9XG5cbiAgRGlzcGxheU1hcCgpe1xuICAgIFxuICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDEzLjAwMDU2MTgsODAuMjQ3ODQ0Nyk7XG4gICAgXG4gICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgY2VudGVyOmxvY2F0aW9uLFxuICAgICAgICAgICAgem9vbToxMCxcbiAgICAgICAgICAgIHN0cmVldFZpZXdDb250cm9sOmZhbHNlLFxuICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKHRoaXMubWFwUmVmLm5hdGl2ZUVsZW1lbnQsb3B0aW9ucyk7XG4gICAgICAgICAgdGhpcy5hZGRNYXJrZXIobG9jYXRpb24sbWFwKTtcbiAgICAgIH1cbiAgICBcbiAgICAgIGFkZE1hcmtlcihwb3NpdGlvbixtYXApIHtcbiAgICAgICAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICAgIG1hcFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG59Il19