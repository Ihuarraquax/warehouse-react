package pl.zablocki.warehouse.controllers.dto;

import lombok.Data;

@Data
public class OrderDto {
    private String product;
    private int count;
}
