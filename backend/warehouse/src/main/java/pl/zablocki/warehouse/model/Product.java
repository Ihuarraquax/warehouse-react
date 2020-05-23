package pl.zablocki.warehouse.model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    @Lob
    private String details;
    @ManyToOne
    private Category category;
    @Lob
    private String imagePath;

    @OneToMany(mappedBy = "product")
    private List<Location> locations;

    private BigDecimal price;

    public Product(String name, String details, Category category,String imagePath, BigDecimal price) {
        this.name = name;
        this.details = details;
        this.category = category;
        this.imagePath = imagePath;
        this.price = price;
    }

    public Product() {

    }
}
