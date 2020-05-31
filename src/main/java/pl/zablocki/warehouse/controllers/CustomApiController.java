package pl.zablocki.warehouse.controllers;

import org.springframework.web.bind.annotation.*;
import pl.zablocki.warehouse.controllers.dto.LocationDto;
import pl.zablocki.warehouse.controllers.dto.OrderDto;
import pl.zablocki.warehouse.controllers.dto.ProductDto;
import pl.zablocki.warehouse.model.Location;
import pl.zablocki.warehouse.model.Order;
import pl.zablocki.warehouse.model.Product;
import pl.zablocki.warehouse.model.User;
import pl.zablocki.warehouse.services.WarehouseService;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class CustomApiController {

    private WarehouseService warehouseService;

    public CustomApiController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @PostMapping(path = "api/products/add")
    public Product addProduct(@RequestBody ProductDto product) {
        Product newProduct = new Product();
        newProduct.setCategory(warehouseService.getCategory(Long.parseLong(product.getCategory())).get());
        newProduct.setDetails(product.getDetails());
        newProduct.setName(product.getName());
        newProduct.setImagePath(product.getImagePath());
        newProduct.setPrice(new BigDecimal(product.getPrice()));

        return warehouseService.addProduct(newProduct);
    }

    @GetMapping(path = "/api/locations/{name}")
    public Optional<Location> getLocationByName(@PathVariable String name) {
        Optional<Location> locationByName = warehouseService.getLocationByName(name);
        if (!locationByName.isPresent()) {
            return locationByName; //hack todo
        }
        locationByName.get().getProduct().setLocations(null);
        return locationByName;
    }

    @PostMapping(path = "/api/locations")
    public Location addLocation(@RequestBody LocationDto locationDto) {
        Optional<Location> locationByName = warehouseService.getLocationByName(locationDto.getName());
        if (locationByName.isPresent()) {
            Location location = locationByName.get();
            location.setName(locationDto.getName());
            location.setCount(locationDto.getCount());
            location.setProduct(warehouseService.getProduct(locationDto.getProductId()).get());
            Location newLocation = warehouseService.addLocation(location);
            newLocation.setProduct(null);
            return newLocation;
        } else {
            Location location = new Location();
            location.setName(locationDto.getName());
            location.setCount(locationDto.getCount());
            location.setProduct(warehouseService.getProduct(locationDto.getProductId()).get());
            Location newLocation = warehouseService.addLocation(location);
            newLocation.setProduct(null);
            return newLocation;
        }
    }


    @DeleteMapping(path = "/api/products/{name}")
    public void deleteProduct(@PathVariable String name) {
        Optional<Product> product = warehouseService.getProduct(name);
        if (product.isPresent()) {
            Product product1 = product.get();
            for (Location location : product1.getLocations()) {
                location.setProduct(null);
                warehouseService.saveLocation(location);
            }
            warehouseService.deleteProduct(product1);
        }
    }

    @PostMapping(path = "/api/user/{username}/orders")
    public void createOrder(@PathVariable String username, @RequestBody OrderDto orderDto) {

        User user = warehouseService.getUserBy(username);
        Order order = new Order();
        order.setCount(orderDto.getCount());
        order.setUser(user);
        order.setProduct(warehouseService.getProduct(orderDto.getProduct()).get());
        Order order1 = warehouseService.saveOrder(order);
        System.out.println(order1);
    }

    @GetMapping(path = "/api/orders")
    public List<Order> getUserOrders(@RequestParam("username") String username) {
        List<Order> ordersBy = warehouseService.getOrdersBy(username);
        for (Order order : ordersBy) {
            System.out.println(order);
        }
        return ordersBy;
    }
}
