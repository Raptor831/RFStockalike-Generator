<span ng-show="!engine.meta.ksprfs.ksprfs_mm_duplicate">@</span><span ng-show="engine.meta.ksprfs.ksprfs_mm_duplicate">+</span>PART[{{engine.meta.ksprfs.ksprfs_engine_id}}]:<span ng-show="engine.meta.ksprfs.ksprfs_mm_duplicate">BEFORE</span><span ng-show="!engine.meta.ksprfs.ksprfs_mm_duplicate">FOR</span>[RealFuels_StockEngines]<span ng-show="engine.meta.ksprfs.ksprfs_mm_has">:HAS[{{engine.meta.ksprfs.ksprfs_mm_has}}]</span><span ng-show="engine.meta.ksprfs.ksprfs_mm_needs">:NEEDS[{{engine.meta.ksprfs.ksprfs_mm_needs}}]</span> //<span ng-bind-html="engine.title"></span>
{
  <span ng-show="engine.meta.ksprfs.ksprfs_mm_duplicate">@name = {{engine.meta.ksprfs.ksprfs_mm_duplicate}}</span><span ng-show="engine.meta.ksprfs.ksprfs_engine_name">
  @title = {{engine.meta.ksprfs.ksprfs_engine_name}}</span>
  @mass = {{math.round((engine.meta.ksprfs.ksprfs_engine_mass+engine.meta.ksprfs.ksprfs_engine_extra_mass)*1000)/1000}}
  @cost = {{engine.meta.ksprfs.engineCost}}
  %entryCost = {{engine.meta.ksprfs.engineEntryCost}}
  <span ng-show="engine.meta.ksprfs.ksprfs_type !== 'rcs'">@maxTemp = {{engine.meta.ksprfs.max_heat}}</span>
  <span ng-show="engine.meta.ksprfs.ksprfs_engine_desc">@description = {{engine.meta.ksprfs.ksprfs_engine_desc}}</span>
  {{engine.meta.ksprfs.ksprfs_engine_patch}}
  @MODULE[<span ng-show="engine.meta.ksprfs.ksprfs_type !== 'rcs'">ModuleEngine*</span><span ng-show="engine.meta.ksprfs.ksprfs_type === 'rcs'">ModuleRCS*</span>]
  {
    <span ng-show="engine.meta.ksprfs.ksprfs_type !== 'rcs'">@name = ModuleEnginesRF
    @maxThrust = {{math.round(engine.meta.ksprfs.ksprfs_engine_thrust * getMixture(engine.meta.ksprfs.ksprfs_engine_configs[0].config_mixture).meta.ksprfs.ksprfs_mixture_thrust_mult)}}</span><span ng-show="engine.meta.ksprfs.ksprfs_type === 'rcs'">@name = ModuleRCSFX
    @thrusterPower = {{math.round(1000 * engine.meta.ksprfs.ksprfs_engine_thrust * getMixture(engine.meta.ksprfs.ksprfs_engine_configs[0].config_mixture).meta.ksprfs.ksprfs_mixture_thrust_mult) / 1000}}</span>
    @heatProduction = {{math.round(engine.meta.ksprfs.engine_heat)}}
    @atmosphereCurve
    {
      @key,0 = 0 {{math.round(engine.meta.ksprfs.resultIspV * getMixture(engine.meta.ksprfs.ksprfs_engine_configs[0].config_mixture).meta.ksprfs.ksprfs_mixture_ispv_mult)}}
      @key,1 = 1 {{math.round(engine.meta.ksprfs.resultIspSL * getMixture(engine.meta.ksprfs.ksprfs_engine_configs[0].config_mixture).meta.ksprfs.ksprfs_mixture_ispsl_mult)}}
    }
    !PROPELLANT[LiquidFuel] {}
    !PROPELLANT[Oxidizer] {}
    !PROPELLANT[MonoPropellant] {}
    PROPELLANT
    {
      name = {{getFuel(getMixture(engine.meta.ksprfs.ksprfs_engine_configs[0].config_mixture)).title}}
      ratio = {{engine.meta.ksprfs.ksprfs_engine_configs[0].fuelRatio | number:6}}
      DrawGauge = True
      <span ng-show="engine.meta.ksprfs.ksprfs_type !== 'solid' && engine.meta.ksprfs.ksprfs_type !== 'solid-plus'">%ResourceFlowMode = {{engine.meta.ksprfs.ksprfs_engine_flow}}</span>
    }
    <span ng-show="getMixture(engine.meta.ksprfs.ksprfs_engine_configs[0].config_mixture).meta.ksprfs.ksprfs_mixture_oxidizer">PROPELLANT
    {
      name = {{getOxidizer(getMixture(engine.meta.ksprfs.ksprfs_engine_configs[0].config_mixture)).title}}
      ratio = {{engine.meta.ksprfs.ksprfs_engine_configs[0].oxyRatio | number:6}}
      %ResourceFlowMode = {{engine.meta.ksprfs.ksprfs_engine_flow}}
    }</span>
  }
  <span ng-show="engine.meta.ksprfs.ksprfs_engine_vectoring_override"><span ng-show="engine.meta.ksprfs.ksprfs_engine_vectoring_exists">MODULE
  {
    name = ModuleGimbal
    gimbalTransformName = thrustTransform
    gimbalRange = {{engine.meta.ksprfs.ksprfs_engine_vectoring}}
  }</span><span ng-show="!engine.meta.ksprfs.ksprfs_engine_vectoring_exists">@MODULE[ModuleGimbal]
  {
    @gimbalRange = {{engine.meta.ksprfs.ksprfs_engine_vectoring}}
  }</span></span>
  MODULE
  {
    name = <span ng-show="!engine.meta.ksprfs.ksprfs_engine_bimodal">ModuleEngineConfigs</span><span ng-show="engine.meta.ksprfs.ksprfs_engine_bimodal">ModuleHybridEngine</span>
    type = <span ng-show="engine.meta.ksprfs.ksprfs_type !== 'rcs'">ModuleEnginesRF</span><span ng-show="engine.meta.ksprfs.ksprfs_type === 'rcs'">ModuleRCSFX</span>
    techLevel = {{displayTechLevel(engine)}}
    origTechLevel = {{displayTechLevel(engine)}}
    engineType = {{engineTypeConfigs[engine.meta.ksprfs.ksprfs_type][0]}}
    origMass = {{engine.meta.ksprfs.ksprfs_engine_mass+engine.meta.ksprfs.ksprfs_engine_extra_mass}}
    configuration = {{engine.meta.ksprfs.ksprfs_engine_configs[0].title}}
    modded = false
    <span ng-repeat="config in engine.meta.ksprfs.ksprfs_engine_configs">
    CONFIG
    {
      name = {{config.title}}
      <span ng-show="engine.meta.ksprfs.ksprfs_type !== 'rcs'">maxThrust = {{math.round(engine.meta.ksprfs.ksprfs_engine_thrust * getMixture(config.config_mixture).meta.ksprfs.ksprfs_mixture_thrust_mult)}}</span><span ng-show="engine.meta.ksprfs.ksprfs_type === 'rcs'">thrusterPower = {{math.round(1000 * engine.meta.ksprfs.ksprfs_engine_thrust * getMixture(config.config_mixture).meta.ksprfs.ksprfs_mixture_thrust_mult) / 1000}}</span>
      heatProduction = {{engine.meta.ksprfs.engine_heat | number:0}}
      PROPELLANT
      {
        name = {{getFuel(getMixture(config.config_mixture)).title}}
        ratio = {{config.fuelRatio}}
        DrawGauge = True
        <span ng-show="engine.meta.ksprfs.ksprfs_type !== 'solid' && engine.meta.ksprfs.ksprfs_type !== 'solid-plus'">%ResourceFlowMode = {{engine.meta.ksprfs.ksprfs_engine_flow}}</span>
      }<span ng-show="getMixture(config.config_mixture).meta.ksprfs.ksprfs_mixture_oxidizer">
      PROPELLANT
      {
        name = {{getOxidizer(getMixture(config.config_mixture)).title}}
        ratio = {{config.oxyRatio}}
        %ResourceFlowMode = {{engine.meta.ksprfs.ksprfs_engine_flow}}
      }</span><span ng-show="engine.meta.ksprfs.ksprfs_type === 'nuclear-thermal'">
      PROPELLANT
      {
        name = EnrichedUranium
        ratio = 0.00000000001
      }</span>
      IspSL = {{config.ispSL_mult | number:4}}
      IspV = {{config.ispV_mult | number:4}}
      throttle = {{engine.finalThrottle}}
      <span ng-show="engine.meta.ksprfs.ksprfs_engine_ignition_mode != 0">ModuleEngineIgnitor
      {
        ignitionsAvailable = {{config.ignitions}}
        useUllageSimulation = {{config.ullage}}
        autoIgnitionTemperature = 800
        <span ng-show="config.ullage">ignitorType = Electric
        IGNITOR_RESOURCE
        {
          name = ElectricCharge
          amount = {{engine.meta.ksprfs.ksprfs_engine_thrust/100}}
        }</span>
      }</span>
      <span ng-show="(config.config_thrust_curve != '0' && config.config_thrust_curve)">curveResource = {{getFuel(getMixture(config.config_mixture)).title}}
      thrustCurve
      {
        {{thrustCurves[config.config_thrust_curve]}}{{config.config_custom_curve}}
      }</span>
      {{engine.meta.ksprfs.ksprfs_engine_config_patch}}
    }</span>
  }
  <span ng-show="engine.meta.ksprfs.ksprfs_engine_ignition_mode != 0">!MODULE[ModuleEngineIgnitor] {}
  ModuleEngineIgnitor
  {
    ignitionsAvailable = {{engine.meta.ksprfs.ksprfs_engine_configs[0].ignitions}}
    autoIgnitionTemperature = 800
    useUllageSimulation = {{engine.meta.ksprfs.ksprfs_engine_configs[0].ullage}}
    <span ng-show="config.ullage">ignitorType = Electric
    IGNITOR_RESOURCE
    {
      name = ElectricCharge
      amount = {{engine.meta.ksprfs.ksprfs_engine_thrust/100}}
    }</span>
  }</span>
  <span ng-show="engine.meta.ksprfs.ksprfs_engine_mft && engine.meta.ksprfs.ksprfs_engine_mft_volume">
  !RESOURCE[LiquidFuel] {}
  !RESOURCE[Oxidizer] {}
  !RESOURCE[MonoPropellant] {}
  !RESOURCE[SolidFuel] {}
  !RESOURCE[XenonGas] {}
  MODULE
  {
    name = ModuleFuelTanks
    basemass = -1
    volume = {{engine.meta.ksprfs.ksprfs_engine_mft_volume}}
    type = {{engine.meta.ksprfs.ksprfs_engine_mft}}
    // dedicated = {{engine.meta.ksprfs.ksprfs_engine_dedicated}}
    TANK
    {
     name = {{getFuel(getMixture(engine.meta.ksprfs.ksprfs_engine_configs[0].config_mixture)).title}}
     amount = full
     maxAmount = {{engine.meta.ksprfs.ksprfs_engine_configs[0].fuelRatio | number:6}}%
    }
    <span ng-show="getMixture(engine.meta.ksprfs.ksprfs_engine_configs[0].config_mixture).meta.ksprfs.ksprfs_mixture_oxidizer">TANK
    {
     name = {{getOxidizer(getMixture(engine.meta.ksprfs.ksprfs_engine_configs[0].config_mixture)).title}}
     amount = full
     maxAmount = {{engine.meta.ksprfs.ksprfs_engine_configs[0].oxyRatio | number:6}}%
    }</span>
  }
  </span>
  <span ng-show="engine.meta.ksprfs.ksprfs_type === 'nuclear-thermal'">!MODULE[ModuleAlternator] {}
  !MODULE[ModuleGenerator] {}
  !RESOURCE[EnrichedUranium] {}
  !RESOURCE[DepletedUranium] {}
  MODULE
  {
    name = ModuleAlternator
    OUTPUT_RESOURCE
    {
      name = EnrichedUranium
      rate = -{{engine.meta.ksprfs.ksprfs_engine_thrust/12}}E-18
    }
    OUTPUT_RESOURCE
    {
      name = DepletedUranium
      rate = {{engine.meta.ksprfs.ksprfs_engine_thrust/12}}E-18
    }
    OUTPUT_RESOURCE
    {
      name = ElectricCharge
      rate = {{engine.meta.ksprfs.ksprfs_engine_thrust/20}}
    }
  }
  MODULE
  {
    name = ModuleGenerator
    isAlwaysActive = true
    OUTPUT_RESOURCE
    {
      name = ElectricCharge
      rate = {{engine.meta.ksprfs.ksprfs_engine_thrust/40}}
    }
    OUTPUT_RESOURCE
    {
      name = DepletedUranium
      rate = {{engine.meta.ksprfs.ksprfs_engine_thrust/12}}E-18
    }
    INPUT_RESOURCE
    {
      name = EnrichedUranium
      rate = {{engine.meta.ksprfs.ksprfs_engine_thrust/12}}E-18
    }
  }
  RESOURCE
  {
    name = EnrichedUranium
    amount = {{engine.meta.ksprfs.ksprfs_engine_thrust/12}}
    maxAmount = {{engine.meta.ksprfs.ksprfs_engine_thrust/12}}
  }
  RESOURCE
  {
    name = DepletedUranium
    amount = 0
    maxAmount = {{engine.meta.ksprfs.ksprfs_engine_thrust/12}}
  }
  </span>
}
