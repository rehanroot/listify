package com.listify.controller;

import com.listify.mariamodel.MariaItem;
import com.listify.service.MariaItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maria-items")
public class MariaItemController {
    @Autowired
    private MariaItemService mariaItemService;

    @PostMapping
    public ResponseEntity<MariaItem> createItem(@RequestBody MariaItem item) {
        MariaItem createdItem = mariaItemService.createItem(item);
        return ResponseEntity.status(201).body(createdItem);
    }

    @GetMapping
    public ResponseEntity<List<MariaItem>> getAllItems() {
        List<MariaItem> items = mariaItemService.getAllItems();
        return ResponseEntity.ok(items);
    }
}


