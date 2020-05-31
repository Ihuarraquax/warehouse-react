package pl.zablocki.warehouse.services;

import org.springframework.stereotype.Service;
import pl.zablocki.warehouse.model.*;
import pl.zablocki.warehouse.model.repository.*;

import java.util.List;
import java.util.Optional;

@Service
public class WarehouseService {

    private ProductRepository productRepository;
    private LocationRepository locationRepository;
    private CategoryRepository categoryRepository;
    private UserRepository userRepository;
    private OrderRepository orderRepository;

    public WarehouseService(ProductRepository productRepository, LocationRepository locationRepository, CategoryRepository categoryRepository, UserRepository userRepository, OrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.locationRepository = locationRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }
    public Optional<Category> getCategory(long id){
        return categoryRepository.findById(id);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> getProduct(long id) {
        return productRepository.findById(id);
    }

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public Optional<Location> getLocationByName(String name) {
        return locationRepository.findByName(name);
    }

    public Location addLocation(Location location) {
        return locationRepository.save(location);
    }

    public void saveLocation(Location location) {
        locationRepository.save(location);
    }

    public void deleteProduct(Product product1) {
        productRepository.delete(product1);
    }

    public Optional<Product> getProduct(String name) {
        return productRepository.findByName(name);
    }

    public User getUserBy(String username) {
        return userRepository.findByUsername(username).get();
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrdersBy(String username) {
        User userBy = getUserBy(username);
        return orderRepository.findAllByUser(userBy);
    }
}
