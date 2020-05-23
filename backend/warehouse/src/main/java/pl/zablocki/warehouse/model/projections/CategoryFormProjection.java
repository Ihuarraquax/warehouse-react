package pl.zablocki.warehouse.model.projections;

import org.springframework.data.rest.core.config.Projection;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.zablocki.warehouse.model.Category;

@CrossOrigin
@Projection(name="categoryForm", types={Category.class})
public interface CategoryFormProjection {
    long getId();
    String getName();
}
