package pl.zablocki.warehouse.model.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.zablocki.warehouse.model.Category;

@CrossOrigin
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
