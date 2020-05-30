package pl.zablocki.warehouse.model;

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

    @ManyToOne()
    private Product product;

    private int count;

    public Location(String name, Product product,int count) {
        this.name = name;
        this.count = count;
        this.product = product;
    }

    public Location() {
    }

}
