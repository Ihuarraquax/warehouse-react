package pl.zablocki.warehouse.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.zablocki.warehouse.model.Product;
import pl.zablocki.warehouse.model.projections.ProductExtendedProjection;

@CrossOrigin
@RepositoryRestResource(excerptProjection = ProductExtendedProjection.class)
public interface ProductRepository extends JpaRepository<Product,Long> {

}
