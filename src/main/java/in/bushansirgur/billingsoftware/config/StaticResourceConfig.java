package in.bushansirgur.billingsoftware.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadDir = Paths.get("Uploads").toAbsolutePath().toString();

        registry.addResourceHandler("/Uploads/**").addResourceLocations("file:" + uploadDir + "/");
    }
}
