package com.ssafy.finedUi.registInfo.image.delete;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageDeleteServiceImpl implements ImageDeleteService{
    @Override
    public void delete(String[] imagePaths) {
        for (String imagePath : imagePaths) {
            Path path = Paths.get(imagePath);
            try {
                Files.deleteIfExists(path);
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}
