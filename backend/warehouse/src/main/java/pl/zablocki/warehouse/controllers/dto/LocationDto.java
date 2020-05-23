package pl.zablocki.warehouse.controllers.dto;

import lombok.Data;

@Data
public class LocationDto {
    private String name;
    private long productId;
    private int count;
}
