package com.farmverse.farmverse_backend.controller;

import com.farmverse.farmverse_backend.dto.ReportRequest;
import com.farmverse.farmverse_backend.entity.Report;
import com.farmverse.farmverse_backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/addreport")
    public ResponseEntity<String> addReport(@RequestBody ReportRequest request) {
        return ResponseEntity.ok(reportService.addReport(request));
    }

    @GetMapping("/getallreports")
    public ResponseEntity<List<Report>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    @GetMapping("/{reportId}")
    public ResponseEntity<Report> getReportById(@PathVariable Integer reportId) {
        return ResponseEntity.ok(reportService.getReportById(reportId));
    }

    @PutMapping("/updatereport/{reportId}")
    public ResponseEntity<String> updateReport(@PathVariable Integer reportId,
                                               @RequestBody ReportRequest request) {
        return ResponseEntity.ok(reportService.updateReport(reportId, request));
    }

    @DeleteMapping("/deletereport/{reportId}")
    public ResponseEntity<String> deleteReport(@PathVariable Integer reportId) {
        return ResponseEntity.ok(reportService.deleteReport(reportId));
    }
}
