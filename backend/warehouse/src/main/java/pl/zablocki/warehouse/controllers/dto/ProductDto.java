package pl.zablocki.warehouse.controllers.dto;

import lombok.Data;

@Data
public class ProductDto {
    private String category;
    private String details;
    private String imagePath;
    private String name;
    private String price;
}
