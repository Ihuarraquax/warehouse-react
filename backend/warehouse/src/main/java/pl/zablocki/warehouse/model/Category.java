package pl.zablocki.warehouse.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @NotNull
    private String name;

    @Lob
    private String details;

    public Category(String name, String details) {
        this.name = name;
        this.details = details;

    }

    public Category() {

    }
}
