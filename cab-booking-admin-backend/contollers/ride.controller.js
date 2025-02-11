import mongoose from "mongoose";
import ExcelJS from 'exceljs';

const rideSchema = new mongoose.Schema({}, { strict: false });
const RideModel = mongoose.model('rides', rideSchema, 'rides');

export const getAllRides = async (req, res) => {
    try {
        const rides = await RideModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: 'Rides fetched successfully',
            data: rides,
        });

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch Rides data' });
    }

};

export const getRideCount = async (req, res) => {
    try {
        const RideCount = await RideModel.countDocuments({});

        return res.status(200).json({
            success: true,
            message: 'Ride count fetched successfully',
            count: RideCount,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch Ride count' });
    }
};

export const getLatestRides = async (req, res) => {
    try {
        const rides = await RideModel.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (-1)
            .limit(6);
        return res.status(200).json({
            success: true,
            message: 'Rides fetched successfully',
            data: rides,
        });

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch Rides data' });
    }

};

export const getExcelReport = async (req, res) => {
    try {
        const { filter, startDate, endDate } = req.query;
        let query = {};

        if (filter === "weekly") {
            const start = new Date();
            start.setDate(start.getDate() - 7);
            query.createdAt = { $gte: start };
        } else if (filter === "monthly") {
            const start = new Date();
            start.setMonth(start.getMonth() - 1);
            query.createdAt = { $gte: start };
        } else if (filter === "custom" && startDate && endDate) {
            query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const data = await RideModel.find(query);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Ride Report");

        worksheet.columns = [
            { header: "Customer Name", key: "userName", width: 30 },
            { header: "Driver Name", key: "driverName", width: 30 },
            { header: "Ride Date", key: "updatedAt", width: 40 },
            { header: "Total Fare", key: "totalFare", width: 20 },
            { header: "Admin Commission", key: "commission", width: 20 },
            { header: "Driver Commission", key: "driverEarning", width: 20 },
        ];

        // Format header row
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true, size: 14 };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFCC00" } };
        });

        let totalFareSum = 0;
        let commissionSum = 0;
        let driverEarningSum = 0;

        // Add data rows
        data.forEach((item) => {
            const totalFare = Number(item.totalFare) || 0;
            const commission = Number(item.commission) || 0;
            const driverEarning = Number(item.driverEarning) || 0;

            totalFareSum += totalFare;
            commissionSum += commission;
            driverEarningSum += driverEarning;

            worksheet.addRow({
                userName: item.userName,
                driverName: item.driverName,
                updatedAt: item.updatedAt.toISOString(),
                totalFare: item.totalFare,
                commission: item.commission,
                driverEarning: item.driverEarning,
            });
        });

        // Add a blank row before summary
        worksheet.addRow([]);
        

        // Add summary row
        const summaryRow = worksheet.addRow({
            userName: "Total",
            driverName: "",
            updatedAt: "",
            totalFare: totalFareSum,
            commission: commissionSum,
            driverEarning: driverEarningSum,
        });

        // Format summary row
        summaryRow.eachCell((cell) => {
            cell.font = { bold: true, size: 12 };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFCCCCFF" } }; // Light purple background
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=ride_report_${filter || "all"}.xlsx`
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error exporting data:", error);
        res.status(500).send("Failed to export data");
    }
};



export default RideModel;