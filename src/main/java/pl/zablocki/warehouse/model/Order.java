package pl.zablocki.warehouse.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JsonBackReference
    private User user;
    @ManyToOne
    @JsonManagedReference
    private Product product;
    private int count;


}
