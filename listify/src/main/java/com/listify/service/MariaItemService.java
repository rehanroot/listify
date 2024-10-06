package com.listify.service;

import com.listify.mariarepository.MariaItemRepository;
import com.listify.mariamodel.MariaItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MariaItemService {
    @Autowired
    private MariaItemRepository mariaItemRepository;

    public MariaItem createItem(MariaItem item) {
        return mariaItemRepository.save(item);
    }

    public List<MariaItem> getAllItems() {
        return mariaItemRepository.findAll();
    }

}
