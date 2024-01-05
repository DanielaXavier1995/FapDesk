const userRepository = require("../repository/userRepository");
const EmployeeRepository = require("../repository/employeeRepository");

class EmployeeController {
    async createEmployee (req, res) {
            try {
                const {
                    emailAddress,
                    password,
                    userType,
                    isActive,
                    name,
                    phoneNumber,
                    registrationNumber,
                    role,
                    isAdmin,
                  } = req.body;

                  console.log("Received request with data:", req.body);

                  const newUser = await userRepository.createUser ({
                    emailAddress,
                    password,
                    userType: "Employee",
                    isActive,
                  });

                // Chama o método createUser da classe pai (UserController)
                // const newUser = await super.createUser(req, res);

                // O Sequelize já atribuiu um valor ao id após a criação do usuário
                const userId = newUser.id;

                const newEmployee = await EmployeeRepository.createEmployee( {
                    userId,
                    name,
                    phoneNumber,
                    registrationNumber,
                    role,
                    isAdmin,
                  });

                  console.log("Employee created:", newEmployee);

                  return res.status(201).json(newEmployee);
              } catch (error) {
                  console.error("Error creating Employee:", error);
                  return res.status(500).json({ error: "Error creating Employee" });
              }
          }
        }

module.exports = EmployeeController;