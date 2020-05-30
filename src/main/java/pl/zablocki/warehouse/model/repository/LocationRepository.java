package pl.zablocki.warehouse.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.zablocki.warehouse.model.Location;

import javax.validation.constraints.NotNull;
import java.util.Optional;


@CrossOrigin()
public interface LocationRepository extends JpaRepository<Location, Long> {

    Optional<Location> findByName(@NotNull String name);
    Optional<Location> findById(@NotNull long id);

}
