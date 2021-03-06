package pl.zablocki.warehouse.model.projections;

import org.springframework.data.rest.core.config.Projection;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.zablocki.warehouse.model.Location;
import pl.zablocki.warehouse.model.Product;

@CrossOrigin
@Projection(name="locationSimple", types={Location.class})
public interface LocationSimpleProjection {
    long getId();
    String getName();
    int getCount();
    Product getProductId();
}
