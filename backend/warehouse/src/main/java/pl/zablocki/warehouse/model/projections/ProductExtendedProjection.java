package pl.zablocki.warehouse.model.projections;

import org.springframework.data.rest.core.config.Projection;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.zablocki.warehouse.model.Category;
import pl.zablocki.warehouse.model.Location;
import pl.zablocki.warehouse.model.Product;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin
@Projection(name="extended", types={Product.class})
public interface ProductExtendedProjection {
    long getId();
    String getName();
    String getDetails();
    Category getCategory();
    String getImagePath();
    List<Location> getLocations();
    BigDecimal getPrice();
}
