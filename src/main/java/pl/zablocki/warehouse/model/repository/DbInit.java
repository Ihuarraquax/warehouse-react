package pl.zablocki.warehouse.model.repository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import pl.zablocki.warehouse.controllers.auth.AuthController;
import pl.zablocki.warehouse.model.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Service
public class DbInit implements CommandLineRunner {
    private LocationRepository locationRepository;
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;
    private RoleRepository roleRepository;
    private AuthController authController;
    private UserRepository userRepository;

    public DbInit(LocationRepository locationRepository, ProductRepository productRepository, CategoryRepository categoryRepository, RoleRepository roleRepository, AuthController authController, UserRepository userRepository) {
        this.locationRepository = locationRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.roleRepository = roleRepository;
        this.authController = authController;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {


        if (productRepository.findAll().size() == 0) {

            roleRepository.save(new Role(ERole.ROLE_USER));
            roleRepository.save(new Role(ERole.ROLE_MODERATOR));
            roleRepository.save(new Role(ERole.ROLE_ADMIN));

            userRepository.save(
                    authController.createUser("mod",
                            "mod@hzablocki.com", "mod",
                            new HashSet<>(Arrays.asList("mod", "user"))));
            userRepository.save(
                    authController.createUser("admin",
                            "admin@hzablocki.com", "admin",
                            new HashSet<>(Arrays.asList("mod", "user", "admin"))));
            userRepository.save(
                    authController.createUser("user",
                            "user@hzablocki.com", "user",
                            new HashSet<>(Arrays.asList("user"))));


            List<Category> categories = new ArrayList<>();
            categories.add(new Category("Elektronika", "Komputery, telefony, RTV i AGD"));
            categories.add(new Category("Do domu", "Meble i akcesoria"));
            categories.add(new Category("Gry Planszowe", "Gry bez prądu"));
            categories.add(new Category("Sztuka", "Obrazy, rzeźby, ozdoby"));

            categories = categoryRepository.saveAll(categories);


            List<Product> products = new ArrayList<>();

            products.add(new Product("XBOX", "konsola do gier",
                    categories.get(0),
                    "https://image.ceneostatic.pl/data/products/50656708/i-microsoft-xbox-one-s-1tb-bialy.jpg",
                    new BigDecimal("980.55")));
            products.add(new Product("Playstation",
                    "konsola do gier firmy Sony",
                    categories.get(0),
                    "https://image.ceneostatic.pl/data/products/47044569/i-sony-playstation-4-slim-500gb-czarny.jpg",
                    new BigDecimal("1300.55")));

            products.add(new Product("SAMSUNG GALAXY S20 PLUS SM-G985 128GB SZARY",
                    "Samsung Galaxy S20+ to smukły smartfon, który świetnie leży w dłoni. Ma zmniejszone ramki, bardzo mały, centralnie położony otwór na przedni aparat oraz większy od swego poprzednika ekran. Dzięki zastosowaniu najnowszych materiałów, zyskał większą trwałość. Zarówno przód, jak i tył urządzenia pokrywa szkło Gorilla Glass 6 generacji. Ramkę wykonano z jednolitego stopu stali, który jest dużo bardziej odporny na trudy codziennego użytkowania. Dodatkowo Galaxy S20+ jest odporny na wodę i pył co jest potwierdzone certyfikatem IP68*.",
                    categories.get(0),
                    "https://image.ceneostatic.pl/data/products/91074690/i-samsung-galaxy-s20-plus-sm-g985-128gb-szary.jpg",
                    new BigDecimal("2600.00")));

            products.add(new Product("URZĄDZENIE WIELOFUNKCYJNE BROTHER INKBENEFIT DCP-J105",
                    "Maksymalna wielkośc formatu: A4 , Szybkość druku kolor: 10 stron na min. , Brak telefonu i faksu , Wbudowana karta sieciowa",
                    categories.get(0),
                    "https://image.ceneostatic.pl/data/products/62144125/i-brother-inkbenefit-plus-dcp-t510w.jpg",
                    new BigDecimal("500.00")));

            products.add(new Product("CHICCO BABY HUG GLACIAL", "Chicco Baby Hug 4in1 Glacial to nie tylko zwykłe łóżeczko dla noworodka. To wyjątkowy, wielofunkcyjny i elegancki mebel 4 w 1, który będzie służyć maluchowi od urodzenia do 36 miesiąca życia. Pozwoli przejść przez wszystkie najważniejsze etapy rozwoju, przemieniając się z kołyski w leżaczek, aby stać się na końcu także krzesełkiem do karmienia oraz fotelem. Dzięki 4 obrotowym kółkom i nieskończonemu systemowi regulacji wysokości, Baby Hug 4 w 1 jest idealnym sprzymierzeńcem dla Ciebie i Twojego dziecka, gdziekolwiek jesteś i czegokolwiek w danym momencie potrzebujesz.",
                    categories.get(1),
                    "https://image.ceneostatic.pl/data/products/56923186/i-chicco-baby-hug-glacial.jpg",
                    new BigDecimal("200.13")));
            products.add(new Product("ZESTAW NARZĘDZI DLA ZEGARMISTRZA ZG16 W ETUI", "Zestaw narzędzi zegarmistrzowskich (24 elementy), w zamykanym etui.",
                    categories.get(3),
                    "https://a.allegroimg.com/s1024/112eb0/20296575401d83d7f553457d58ae",
                    new BigDecimal("49.99")));
            products.add(new Product("ZESTAW KREATYWNY POMARAŃCZOWY BREWIS ZK30", "Zestaw Stwórz swoją biżuterię marki Brewis to świetny sposób na zaspokojenie kreatywnych zapędów. Zestaw koralików pozwala na stworzenie unikatowych łańcuszków. Dostępny w 4 wariantach kolorystycznych.",
                    categories.get(3),
                    "https://atakto.pl/media/catalog/product/cache/500x500/i/m/image_975_4_5637426462.jpg",
                    new BigDecimal("7.17")));

            products.add(new Product("GRA PLANSZOWA CATAN (OSADNICY Z CATANU)", "Jesteście pierwszymi osadnikami, którzy przybyli na wyspę Catan. Szybko wznosicie pierwsze osady i budujecie pierwsze drogi. Okoliczne tereny zapewniają wam surowce niezbędne do rozwoju. Handel kwitnie, a osady rozrastają się do miast.\n" +
                    "Jednak po pewnym czasie na wyspie zaczyna brakować miejsca – wtedy rozpoczyna się walka o ziemię, surowce i władzę. Pora wprowadzić w życie wasz błyskotliwy plan, licząc przy tym na odrobinę szczęścia!",
                    categories.get(2),
                    "https://image.ceneostatic.pl/data/products/1719251/i-catan-osadnicy-z-catanu.jpg",
                    new BigDecimal("99.90")));

            products.add(new Product("GRA PLANSZOWA TERRAFORMACJA MARSA", "\"Rząd Ziemi został powołany w 2174 roku i od samego początku, przez niemal półtora wieku, nieustannie dążył do osiągnięcia globalnej jedności i pokoju. Naszą misją było stać się uniwersalnym dla całej ludzkości narzędziem kształtowania lepszego jutra.",
                    categories.get(2),
                    "https://image.ceneostatic.pl/data/article_picture/0e/c9/6aef-8436-4c8c-963f-8d320dfc5890_large.jpg",
                    new BigDecimal("119.95")));

            products = productRepository.saveAll(products);

            List<Location> locations = new ArrayList<>();
            locations.add(new Location("AA-001-1", products.get(0), 30));
            locations.add(new Location("AA-001-2", products.get(1), 13));
            locations.add(new Location("AA-001-3", products.get(2), 1));
            locations.add(new Location("AA-001-4", products.get(3), 24));
            locations.add(new Location("AA-002-0", products.get(4), 5));
            locations.add(new Location("AA-002-1", products.get(4), 14));
            locations.add(new Location("AA-002-3", products.get(4), 23));

            locationRepository.saveAll(locations);
        }
    }
}
