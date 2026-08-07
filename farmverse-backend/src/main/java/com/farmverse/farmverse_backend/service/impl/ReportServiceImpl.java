package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.ReportRequest;
import com.farmverse.farmverse_backend.entity.Report;
import com.farmverse.farmverse_backend.repository.FarmRepository;
import com.farmverse.farmverse_backend.repository.ReportRepository;
import com.farmverse.farmverse_backend.security.SecurityUtils;
import com.farmverse.farmverse_backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @Override
    public String addReport(ReportRequest request) {
        if (!securityUtils.isAdmin()) {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            farmRepository.findByFarmIdAndUserId(request.getFarmId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Target farm not found or access denied"));
        }

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
        if (securityUtils.isAdmin()) {
            return reportRepository.findAll();
        }
        Integer currentUserId = securityUtils.getAuthenticatedUserId();
        return reportRepository.findByUserId(currentUserId);
    }

    @Override
    public Report getReportById(Integer reportId) {
        if (securityUtils.isAdmin()) {
            return reportRepository.findById(reportId)
                    .orElseThrow(() -> new RuntimeException("Report not found"));
        }
        Integer currentUserId = securityUtils.getAuthenticatedUserId();
        return reportRepository.findByReportIdAndUserId(reportId, currentUserId)
                .orElseThrow(() -> new RuntimeException("Report not found or access denied"));
    }

    @Override
    public String updateReport(Integer reportId, ReportRequest request) {
        Report report;
        if (securityUtils.isAdmin()) {
            report = reportRepository.findById(reportId)
                    .orElseThrow(() -> new RuntimeException("Report not found"));
        } else {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            report = reportRepository.findByReportIdAndUserId(reportId, currentUserId)
                    .orElseThrow(() -> new RuntimeException("Report not found or access denied"));
            farmRepository.findByFarmIdAndUserId(request.getFarmId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Target farm not found or access denied"));
        }

        report.setFarmId(request.getFarmId());
        report.setReportType(request.getReportType());
        report.setReportDate(request.getReportDate());
        report.setDescription(request.getDescription());

        reportRepository.save(report);

        return "Report updated successfully";
    }

    @Override
    public String deleteReport(Integer reportId) {
        Report report;
        if (securityUtils.isAdmin()) {
            report = reportRepository.findById(reportId)
                    .orElseThrow(() -> new RuntimeException("Report not found"));
        } else {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            report = reportRepository.findByReportIdAndUserId(reportId, currentUserId)
                    .orElseThrow(() -> new RuntimeException("Report not found or access denied"));
        }

        reportRepository.delete(report);

        return "Report deleted successfully";
    }
}
