package pl.zablocki.warehouse.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @NotNull
    @Column(unique=true)
    private String name;

    @ManyToOne
    @JsonBackReference
    private Product product;

    private int count;

    public Location(String name, Product product,int count) {
        this.name = name;
        this.count = count;
        this.product = product;
    }

    public Location() {
    }

    @Override
    public String toString() {
        return "Location{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", product=" + product.getName() +
                ", count=" + count +
                '}';
    }
}
