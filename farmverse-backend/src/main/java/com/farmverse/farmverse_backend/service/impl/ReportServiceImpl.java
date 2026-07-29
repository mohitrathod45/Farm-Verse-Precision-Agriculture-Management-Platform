package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.ReportRequest;
import com.farmverse.farmverse_backend.entity.Report;
import com.farmverse.farmverse_backend.repository.ReportRepository;
import com.farmverse.farmverse_backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Override
    public String addReport(ReportRequest request) {

        Report report = new Report();
        report.setFarmId(request.getFarmId());
        report.setReportType(request.getReportType());
        report.setReportDate(request.getReportDate());
        report.setDescription(request.getDescription());

        reportRepository.save(report);

        return "Report added successfully";
    }

    @Override
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    @Override
    public Report getReportById(Integer reportId) {

        return reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));
    }

    @Override
    public String updateReport(Integer reportId, ReportRequest request) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        report.setFarmId(request.getFarmId());
        report.setReportType(request.getReportType());
        report.setReportDate(request.getReportDate());
        report.setDescription(request.getDescription());

        reportRepository.save(report);

        return "Report updated successfully";
    }

    @Override
    public String deleteReport(Integer reportId) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        reportRepository.delete(report);

        return "Report deleted successfully";
    }
}
