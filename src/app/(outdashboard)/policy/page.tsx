"use client"
import { useState, useRef, useEffect } from "react";
import {
    Box,
    Paper,
    Typography,
    useTheme,
    Container,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    Drawer,
    IconButton,
    AppBar,
    Toolbar,
    Tabs,
    Tab
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

const NAV_CATEGORIES = [
    {
        name: "Términos y Condiciones",
        menu: [
            "0. Introducción",
            "1. Aceptación de los términos",
            "2. Identificación del titular",
            "3. Objeto del sitio web",
            "4. Condiciones de uso",
            "5. Propiedad intelectual e industrial",
            "6. Política de tratamiento de datos personales",
            "7. Obligaciones de los usuarios",
            "8. Exclusión de garantías y responsabilidad"
        ]
    },
    {
        name: "Políticas y Privacidad",
        menu: [
            "0. Introducción",
            "1. Alcance",
            "2. Datos recolectados",
            "3. Finalidades del tratamiento",
            "4. Derechos de los titulares",
            "5. Mecanismos para ejercer derechos",
            "6. Seguridad de la información",
            "7. Transferencia y transmisiones internacionales",
            "8. Vigencia de la política"
        ]
    }
];

interface ContentSection {
    title: string;
    content: string;
}

interface ContentCategory {
    [key: string]: ContentSection;
}

interface ContentSections {
    [key: string]: ContentCategory;
}

const CONTENT_SECTIONS: ContentSections = {
    "Términos y Condiciones": {
        "0. Introducción": {
            title: "0. Introducción",
            content: "El ingreso, uso, navegación y registro en el presente sitio web implica la total aceptación sin reservas de los presentes Términos y Condiciones. Este documento regula el acceso y uso de la información, servicios y funcionalidades provistas por INMOBILIARIA JD a través de su plataforma digital."
        },
        "1. Aceptación de los términos": {
            title: "1. ACEPTACIÓN DE LOS TÉRMINOS",
            content: "El usuario declara que es mayor de edad y posee la capacidad legal necesaria para aceptar estos Términos y Condiciones. En caso de no estar de acuerdo con alguno de los puntos contenidos en este documento, se solicita abstenerse de acceder al sitio o utilizar sus servicios. La aceptación se entiende plena y vinculante al continuar navegando en el sitio web."
        },
        "2. Identificación del titular": {
            title: "2. IDENTIFICACIÓN DEL TITULAR",
            content: "Este sitio web es administrado por INMOBILIARIA JD, una empresa legalmente constituida conforme a las leyes de la República de Colombia. Todos los servicios y contenidos alojados en el sitio están bajo su responsabilidad y están sujetos al cumplimiento de la normatividad legal vigente, incluyendo la Ley 1581 de 2012 y el Decreto 1377 de 2013 sobre protección de datos personales. Para efectos de contacto, INMOBILIARIA JD dispone de sus canales oficiales de atención como correo electrónico, teléfono, y puntos físicos."
        },
        "3. Objeto del sitio web": {
            title: "3. OBJETO DEL SITIO WEB",
            content: "El sitio web de INMOBILIARIA JD tiene por objeto brindar información relacionada con sus servicios inmobiliarios, tales como arriendo, venta, administración de bienes inmuebles, atención al cliente, encuestas, formularios de contacto, información de proyectos y toda actividad digital destinada a facilitar la comunicación entre la empresa y sus usuarios.\n\nAdemás, a través del sitio se podrá realizar:\n\n- Solicitudes de información sobre inmuebles.\n- Registro a formularios de contacto para asesorías.\n- Participación en encuestas de satisfacción.\n- Acceso a documentos de interés.\n- Descarga de material informativo.\n\nEste sitio puede contener enlaces a sitios web de terceros. INMOBILIARIA JD no se hace responsable por los contenidos, políticas o prácticas de privacidad de dichos sitios. El uso de enlaces externos es responsabilidad exclusiva del usuario."
        },
        "4. Condiciones de uso": {
            title: "4. CONDICIONES DE USO",
            content: "El usuario se compromete a utilizar este sitio web de manera correcta, legal y respetuosa, absteniéndose de:\n\n- Utilizarlo con fines que contravengan la ley, la moral o el orden público.\n- Reproducir, copiar, distribuir, transformar o modificar los contenidos sin autorización previa.\n- Introducir virus, malware o cualquier otro software malicioso.\n- Utilizar los contenidos del sitio con fines comerciales no autorizados.\n- Usurpar la identidad de otras personas o registrar datos falsos.\n- Interferir con la funcionalidad técnica del sitio o intentar vulnerar su seguridad.\n\nCualquier uso indebido podrá ser sancionado legalmente, incluyendo la restricción o cancelación del acceso al sitio web y la notificación a autoridades competentes."
        },
        "5. Propiedad intelectual e industrial": {
            title: "5. PROPIEDAD INTELECTUAL E INDUSTRIAL",
            content: "Todos los derechos de propiedad intelectual e industrial sobre los contenidos de este sitio (incluyendo pero sin limitarse a: textos, imágenes, diseños, logotipos, iconos, bases de datos, software, nombre comercial y demás elementos) pertenecen a INMOBILIARIA JD o han sido licenciados debidamente.\n\nNingún contenido podrá ser reproducido, transformado, difundido o utilizado sin autorización expresa por escrito del titular. El incumplimiento podrá derivar en acciones legales civiles y/o penales. Cualquier infracción será perseguida conforme a la legislación vigente."
        },
        "6. Política de tratamiento de datos personales": {
            title: "6. POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES",
            content: "Capítulo 1: Ámbito\nEsta política aplica a todos los datos personales recolectados, almacenados y tratados por la Inmobiliaria en el marco de su actividad comercial.\n\nCapítulo 2: Definiciones\nSe entenderá por datos personales, tratamiento, titular, responsable y encargado, según lo establecido por la Ley 1581 de 2012 y normativas relacionadas.\n\nCapítulo 3: Principios Rectores\nLegalidad, finalidad, libertad, veracidad, transparencia, acceso, seguridad, confidencialidad, temporalidad y responsabilidad demostrada.\n\nCapítulo 4: Derechos de los Titulares\nLos titulares podrán:\n- Acceder a sus datos personales que estén bajo control de la Inmobiliaria.\n- Rectificar la información inexacta o incompleta.\n- Solicitar la supresión de datos cuando su tratamiento no cumpla principios legales.\n- Revocar la autorización otorgada previamente.\n\nCapítulo 5: Finalidades del Tratamiento\nLos datos personales se usarán para:\n- Administración de bienes inmuebles.\n- Gestión de contratos, clientes y terceros.\n- Envío de comunicaciones y encuestas.\n- Atención personalizada y cumplimiento legal.\n\nCapítulo 6: Transferencia de Datos\nLa Inmobiliaria podrá transferir datos a terceros nacionales o internacionales, garantizando medidas equivalentes de protección.\n\nCapítulo 7: Ejercicio de Derechos\nEl titular podrá ejercer sus derechos mediante:\n- Correo electrónico.\n- Llamadas telefónicas.\n- Solicitudes presenciales.\n\nCapítulo 8: Seguridad de la Información\nSe aplicarán medidas de seguridad técnicas, administrativas y físicas contra accesos no autorizados, alteraciones o usos indebidos."
        },
        "7. Obligaciones de los usuarios": {
            title: "7. OBLIGACIONES DE LOS USUARIOS",
            content: "El usuario se obliga a proporcionar información veraz, completa y actualizada al interactuar con formularios y servicios del sitio. Asimismo, reconoce que cualquier falsedad o inexactitud podrá ser sancionada y dar lugar a la suspensión del acceso a los servicios de la web.\n\nEl usuario acepta expresamente que:\n- Es responsable del contenido que envíe mediante formularios.\n- Deberá abstenerse de realizar cualquier acción que ponga en riesgo la seguridad del sitio.\n- Deberá respetar los derechos de terceros, incluyendo privacidad, propiedad y reputación."
        },
        "8. Exclusión de garantías y responsabilidad": {
            title: "8. EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD",
            content: "INMOBILIARIA JD no garantiza la disponibilidad continua del sitio web ni se hace responsable por daños derivados de:\n\n- Fallas técnicas, interrupciones, virus u otros factores ajenos.\n- Uso indebido por parte de terceros.\n- Decisiones tomadas con base en la información contenida en el sitio.\n\nEl uso del sitio es bajo riesgo exclusivo del usuario. INMOBILIARIA JD no garantiza que el sitio se encuentre libre de errores o que su funcionamiento sea ininterrumpido."
        }
    },
    "Políticas y Privacidad": {
        "0. Introducción": {
            title: "0. Introducción",
            content: "La presente Política de Privacidad tiene como finalidad informar a los usuarios del sitio web de INMOBILIARIA JD sobre el tratamiento que se da a los datos personales recolectados, las finalidades de su uso, los derechos de los titulares y los mecanismos para su ejercicio, conforme a lo establecido en la Ley 1581 de 2012 y el Decreto 1377 de 2013.\n\nINMOBILIARIA JD se compromete con la protección y confidencialidad de los datos personales, aplicando altos estándares de seguridad, transparencia y legalidad."
        },
        "1. Alcance": {
            title: "1. Alcance",
            content: "Esta política aplica a todos los datos personales recolectados por INMOBILIARIA JD a través de su sitio web, formularios de contacto, llamadas telefónicas, canales de mensajería, encuestas y cualquier otro medio digital o físico."
        },
        "2. Datos recolectados": {
            title: "2. Datos recolectados",
            content: "INMOBILIARIA JD podrá recolectar los siguientes tipos de datos personales:\n\n- Datos de identificación (nombre completo, tipo y número de documento).\n- Datos de contacto (correo electrónico, teléfono, dirección).\n- Información comercial y contractual (interés en inmuebles, preferencias, historial de contacto).\n- Información técnica (dirección IP, cookies, tipo de navegador)."
        },
        "3. Finalidades del tratamiento": {
            title: "3. Finalidades del tratamiento",
            content: "Los datos personales serán tratados con los siguientes propósitos:\n\n- Brindar información sobre inmuebles, servicios o actividades de la empresa.\n- Gestionar solicitudes, consultas o reclamos de usuarios.\n- Administrar relaciones contractuales y precontractuales.\n- Evaluar la satisfacción de los usuarios mediante encuestas.\n- Realizar envío de boletines, promociones o información institucional.\n- Cumplir con obligaciones legales y regulatorias."
        },
        "4. Derechos de los titulares": {
            title: "4. Derechos de los titulares",
            content: "Los titulares de los datos personales tienen derecho a:\n\n- Conocer, actualizar y rectificar sus datos.\n- Solicitar prueba de la autorización otorgada.\n- Ser informados sobre el uso que se le ha dado a sus datos.\n- Presentar quejas ante la Superintendencia de Industria y Comercio.\n- Revocar la autorización o solicitar la supresión de datos."
        },
        "5. Mecanismos para ejercer derechos": {
            title: "5. Mecanismos para ejercer derechos",
            content: "Los titulares podrán ejercer sus derechos a través de los siguientes medios:\n\n- Correo electrónico institucional publicado en el sitio.\n- Teléfono de atención al cliente.\n- Oficinas físicas de INMOBILIARIA JD.\n\nLas solicitudes serán atendidas en los términos establecidos por la ley, dentro de los tiempos legales vigentes."
        },
        "6. Seguridad de la información": {
            title: "6. Seguridad de la información",
            content: "INMOBILIARIA JD adopta medidas administrativas, técnicas y físicas razonables para proteger la información recolectada contra accesos no autorizados, uso indebido, pérdida, robo, alteración o destrucción."
        },
        "7. Transferencia y transmisiones internacionales": {
            title: "7. Transferencia y transmisiones internacionales",
            content: "Cuando sea necesario, los datos podrán ser transferidos o transmitidos a terceros, incluyendo entidades fuera del país, siempre que garanticen niveles adecuados de protección y cumplan con los fines establecidos."
        },
        "8. Vigencia de la política": {
            title: "8. Vigencia de la política",
            content: "La presente Política de Privacidad entra en vigor desde su publicación y podrá ser actualizada por INMOBILIARIA JD en cualquier momento. Cualquier modificación sustancial será notificada a través de los canales oficiales.\n\nSi tiene dudas o desea más información sobre esta política, puede comunicarse con nosotros mediante nuestros canales de contacto oficiales."
        }
    }
};



export default function LegalDocuments() {
    const [selectedCategory, setSelectedCategory] = useState(NAV_CATEGORIES[0]);
    const [selectedMenu, setSelectedMenu] = useState(NAV_CATEGORIES[0].menu[0]);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const router = useRouter();

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 112;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (selectedMenu) {
            const sectionId = selectedMenu.toLowerCase().replace(/\s+/g, "-");
            setTimeout(() => scrollToSection(sectionId), 100);
        }
    }, [selectedMenu]);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const handleCategoryChange = (_: any, newValue: string) => {
        const cat = NAV_CATEGORIES.find((c) => c.name === newValue);
        if (cat) {
            setSelectedCategory(cat);
            setSelectedMenu(cat.menu[0]);
        }
    };

    const handleMenuClick = (menuItem: string) => {
        setSelectedMenu(menuItem);
        if (isMobile) setMobileOpen(false);
        setTimeout(() => {
            const sectionId = menuItem.toLowerCase().replace(/\s+/g, "-");
            scrollToSection(sectionId);
        }, 100);
    };

    const handleLogoClick = () => {
        router.push("/");
    };

    const drawerContent = (
        <List >
            {selectedCategory.menu.map((item) => {
                const section = CONTENT_SECTIONS[selectedCategory.name]?.[item];
                return (
                    <ListItem key={item} disablePadding >
                        <ListItemButton
                            selected={selectedMenu === item}
                            onClick={() => handleMenuClick(item)}
                            sx={{
                            
                                pl: 3,
                                "&.Mui-selected": {
                                    backgroundColor: "#f5f5f5",
                                    color: "#2c3e50",
                                    "&:hover": { backgroundColor: "#e8e8e8" }
                                }
                            }}
                        >
                            <ListItemText
                                primary={section?.title || item}
                                primaryTypographyProps={{
                                    sx: {
                                        fontSize: "0.85rem",
                                        fontWeight: selectedMenu === item ? "bold" : "normal",
                                        color: selectedMenu === item ? "#2c3e50" : "#333333",
                                        textTransform: "uppercase"
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );

    return (
        <Box className="flex flex-col bg-white">
            <AppBar
                position="fixed"
                color="default"
                elevation={0}
                sx={{
                    background: "#ffffff",
                    boxShadow: "none",
                    borderBottom: "1px solid #e0e0e0",
                    px: 0,
                    zIndex: 1300
                }}
            >
                <Toolbar sx={{ minHeight: 64, px: 0 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ ml: 1, mr: 2, display: { md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            width: { xs: 60, md: 100 },
                            height: { xs: 40, md: 40 },
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            transition: "all 0.5s ease-in-out",
                            cursor: "pointer",
                            "& img": {
                                transition: "all 0.5s ease-in-out",
                                transform: "scale(1)",
                            }
                        }}
                        onClick={handleLogoClick}
                    >
                        <img
                            src="/image/logo/mls-logo.png"
                            alt="MLS Logo"
                            style={{ width: "100%", height: "70%", objectFit: "contain" }}
                        />
                        <Box
                            component="span"
                            sx={{
                                fontWeight: "bold",
                                fontSize: { xs: "1rem", md: "1.9rem" },
                                marginLeft: 1,
                                color: "#333",
                                transition: "all 0.5s ease-in-out",
                                transform: "scale(1)",
                            }}
                        >
                            MLS
                        </Box>
                        <span className="mx-2">|</span>
                        <img
                            src="/image/logo/logo-activos-por-coplombia.webp"
                            alt="Logo Activos por Colombia"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                display: "block"
                            }}
                        />
                    </Box>
                </Toolbar>
                <Tabs
                    value={selectedCategory.name}
                    onChange={handleCategoryChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        px: 0,
                        background: "#fff",
                        borderBottom: "1px solid #e0e0e0",
                        minHeight: 48
                    }}
                >
                    {NAV_CATEGORIES.map((cat, idx) => (
                        <Tab
                            key={cat.name}
                            label={cat.name}
                            value={cat.name}
                            sx={{
                                fontWeight:
                                    selectedCategory.name === cat.name ? "bold" : "normal",
                                textTransform: "none",
                                minWidth: 0,
                                px: 2,
                                ml: idx === 0 ? 0 : undefined,
                                color: "#2c3e50",
                                "&.Mui-selected": {
                                    color: "#1a1a1a",
                                    fontWeight: "bold"
                                }
                            }}
                        />
                    ))}
                </Tabs>
            </AppBar>

            <Box sx={{ height: { xs: 112, md: 112 } }} />

            <Box
                sx={{
                    display: { xs: "block", md: "flex" },
                    flexDirection: "row",
                    width: "100%",
                    minHeight: "100vh"
                }}
            >
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            width: 300,
                             paddingTop: 7,
                            boxSizing: "border-box"
                        }
                    }}
                >
                    {drawerContent}
                </Drawer>

                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        width: 280,
                        flexShrink: 0,
                        borderRight: "1px solid #e0e0e0",
                        backgroundColor: "#ffffff",
                        height: "100vh",
                        position: "sticky",
                        top: 112,
                        overflowY: "auto"
                    }}
                >
                    {drawerContent}
                </Box>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        backgroundColor: "#fff",
                        overflowY: "auto",
                        height: "100vh",
                        width: { md: "calc(100% - 280px)" },
                        pt: { xs: 1, md: 0 }
                    }}
                >
                    <Container maxWidth="lg">
                        <Paper elevation={0} sx={{ p: {xs:0, md: 4}  }}>
                            <Box sx={{ mb: 6 }}>
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    gutterBottom
                                    sx={{ color: "#2c3e50", fontWeight: "bold" }}
                                >
                                    {selectedCategory.name}
                                </Typography>
                                {selectedCategory.menu.map((menuItem) => {
                                    const section =
                                        CONTENT_SECTIONS[selectedCategory.name]?.[menuItem];
                                    if (!section) return null;

                                    const sectionId = menuItem
                                        .toLowerCase()
                                        .replace(/\s+/g, "-");

                                    return (
                                        <Box
                                            key={menuItem}
                                            id={sectionId}
                                            sx={{
                                                mb: 4,
                                                scrollMarginTop: "112px",
                                                scrollBehavior: "smooth"
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                gutterBottom
                                                sx={{ color: "#2c3e50", mt: 2 }}
                                            >
                                                {section.title}
                                            </Typography>
                                            <Typography variant="body1" paragraph>
                                                {section.content}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Paper>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}
