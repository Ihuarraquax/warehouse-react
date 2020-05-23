package pl.zablocki.warehouse.controllers;

import org.springframework.web.bind.annotation.*;
import pl.zablocki.warehouse.controllers.dto.LocationDto;
import pl.zablocki.warehouse.controllers.dto.ProductDto;
import pl.zablocki.warehouse.model.Location;
import pl.zablocki.warehouse.model.Product;
import pl.zablocki.warehouse.services.WarehouseService;

import java.math.BigDecimal;
import java.util.Optional;

@CrossOrigin
@RestController
public class CustomApiController {

    private WarehouseService warehouseService;

    public CustomApiController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @PostMapping(path = "api/products/add")
    public Product addProduct(@RequestBody ProductDto product){
        Product newProduct = new Product();
        newProduct.setCategory(warehouseService.getCategory(Long.parseLong(product.getCategory())).get());
        newProduct.setDetails(product.getDetails());
        newProduct.setName(product.getName());
        newProduct.setImagePath(product.getImagePath());
        newProduct.setPrice(new BigDecimal(product.getPrice()));

        return warehouseService.addProduct(newProduct);
    }

    @GetMapping(path = "/api/locations/{name}")
    public Optional<Location> getLocationByName(@PathVariable String name){
        Optional<Location> locationByName = warehouseService.getLocationByName(name);
        if(!locationByName.isPresent()){
            return locationByName; //hack todo
        }
        locationByName.get().getProduct().setLocations(null);
        return locationByName;
    }

    @PostMapping(path = "/api/locations")
    public Location addLocation(@RequestBody LocationDto locationDto){
        Location location = new Location();
        location.setName(locationDto.getName());
        location.setCount(locationDto.getCount());
        location.setProduct(warehouseService.getProduct(locationDto.getProductId()).get());
        Location newLocation = warehouseService.addLocation(location);
        newLocation.setProduct(null);
        return newLocation;
    }

//    @GetMapping(path = "/api/locations")
//    public List<Location> getAllLocations(){
//
//        list
//    }
}
